//key a crear
const keyAlarm = 'alarms-list';

//devuelve los datos del key
export function getAlarm(){
    const alarmStorage = window.localStorage.getItem(keyAlarm);
    let alarms = [];

    if(alarmStorage !== null) alarms = JSON.parse(alarmStorage)

    let alarmsAm = []
    let alarmsPm = []

    for(let alarm of alarms){
        if(alarm.hour.includes("AM")){
            alarmsAm.push(alarm)
        }else{
            alarmsPm.push(alarm)
        }
    }

    //ordern objectos alarmas de la mañana

    let sortTrueAm = []
    let sortTruePm = []

    for(iden of alarmsAm){

        let identifierAm = iden.hour.split(":")

        if(identifierAm[0]=="12"){
            sortTrueAm.push(iden)
        }else{
            sortTruePm.push(iden)
        }

    }

    sortTrueAm.sort((a,b) => a.hour.localeCompare(b.hour))
    sortTruePm.sort((a,b) => a.hour.localeCompare(b.hour))

    alarmsAm = []
    alarmsAm = sortTrueAm.concat(sortTruePm)

    //fin alarmas mañana

    //orden objectos alarmas de la tarde

    let sortAm = []
    let sortPm = []

    for(iden of alarmsPm){

        let identifierAm = iden.hour.split(":")

        if(identifierAm[0]=="12"){
            sortAm.push(iden)
        }else{
            sortPm.push(iden)
        }

    }

    sortAm.sort((a,b) => a.hour.localeCompare(b.hour))
    sortPm.sort((a,b) => a.hour.localeCompare(b.hour))

    alarmsPm = []
    alarmsPm = sortAm.concat(sortPm)

    //fin alarmas tarde

    alarms = []
    alarms = alarmsAm.concat(alarmsPm)

    return alarms
}

//crea nuevos datos en el key
export function createAlarm(alarm){
    const oldAlarms = getAlarm();
    alarm.id = Date.now();

    const newAlarms = [...oldAlarms,alarm]
    
    window.localStorage.setItem(keyAlarm,JSON.stringify(newAlarms));
}

export function editAlarm(alarm){

    const oldAlarms = getAlarm()

    const editAlarms = []
    
    oldAlarms.forEach((editedAlarm) => {

        if(alarm?.id==editedAlarm?.id){
            editedAlarm.description = alarm.description
            editedAlarm.hour = alarm.hour
            editedAlarm.days = alarm.days
        }

        editAlarms.push(editedAlarm)
    
    })

    window.localStorage.setItem(keyAlarm, JSON.stringify(editAlarms))
}

//borra datos del key
export function deleteAlarm(id){

    const newId = parseInt(id)

    const oldAlarms = getAlarm();
    const newAlarms = oldAlarms.filter(alarm => alarm.id !== newId);

    window.localStorage.setItem(keyAlarm, JSON.stringify(newAlarms));
}