// imported functions

import { createAlarm, deleteAlarm, getAlarm, editAlarm } from "../storage/alarm"
import { mkStore } from '../stores/mkStore'

const { isProduction } = mkStore()

/* clock components */ 

const clockHour = document.querySelector('.Clock-hourNumber');
const clockMinute = document.querySelector('.Clock-minuteNumber');
const clockSecond = document.querySelector('.Clock-secondNumber');
const clockMeridian = document.querySelector('.Clock-meridian');

function alarmClock(){

	let screenWidth = screen.width

	let date = new Date();
    hour = date.getHours()
	meridian = "AM"
    minute = date.getMinutes()
    second = date.getSeconds()

	if(hour >= 12){
		hour = hour - 12
		meridian = "PM"
	}

	if(hour == 0 ){
		hour = 12
	}

	if(minute < 10){
		minute = "0"+minute
	}

	if(second < 10){
		second = "0"+second
	}
    
	if(meridian == "AM"){
		if(hour < 10){
			clockHour.innerHTML = "0"+hour;
			clockMinute.innerHTML = minute;
			clockSecond.innerHTML = second;
			clockMeridian.innerHTML = meridian;
			timerClock = "0"+hour+":"+minute+":"+second+" AM"
		}else{
			clockHour.innerHTML = hour;
			clockMinute.innerHTML = minute;
			clockSecond.innerHTML = second;
			clockMeridian.innerHTML = meridian;
			timerClock = hour+":"+minute+":"+second+" AM"
		}
	}else{
		if(hour < 10){
			clockHour.innerHTML = "0"+hour;
			clockMinute.innerHTML = minute;
			clockSecond.innerHTML = second;
			clockMeridian.innerHTML = meridian;
			timerClock = hour+":"+minute+":"+second+" PM"
		}else{
			clockHour.innerHTML = hour;
			clockMinute.innerHTML = minute;
			clockSecond.innerHTML = second;
			clockMeridian.innerHTML = meridian;
			timerClock = hour+":"+minute+":"+second+" PM"
		}
	}

	const clockHourSpanFull = document.querySelector('.Clock-hourSpanFull')
	const clockMinuteSpanFull = document.querySelector('.Clock-minuteSpanFull')
	const clockSecondSpanFull = document.querySelector('.Clock-secondSpanFull')

	if(screenWidth <= 720){
		clockHourSpanFull.innerHTML = "Hs"
		clockMinuteSpanFull.innerHTML = "Min"
		clockSecondSpanFull.innerHTML = "Seg"

	}else{
		clockHourSpanFull.innerHTML = "Horas"
		clockMinuteSpanFull.innerHTML = "Minutos"
		clockSecondSpanFull.innerHTML = "Segundos"
	}

	alarmAlert(timerClock)
	setTimeout(alarmClock, 500)


}

function setAudioProperties(audio){
	const button = document.querySelector('[data-toggle="alert-button"]')
	const alarmModal = document.querySelector('.Alert')

	const setPostTimer =document.querySelector('[data-toggle="alert-postpone-button"]')

	button.addEventListener('click',() => {
		audio.pause()
		audio.loop = false
		alarmModal.classList.remove('is-visible')
		alarmModal.classList.add('is-hidden')
	})

	setPostTimer.addEventListener('click', () => {
		audio.pause()
		audio.loop = false

		alarmModal.classList.remove('is-visible')
		alarmModal.classList.add('is-hidden')

		setTimeout(() => {
			alarmModal.classList.remove('is-hidden')
			alarmModal.classList.add('is-visible')

			audio.play()
			audio.loop = true
		},300000)

	})
}

function alarmAlert(clock){

	const alarms = getAlarm()
	const date = new Date()
	const alarmModal = document.querySelector('.Alert')
	let audio

	if(isProduction()){
		audio = new Audio("assets/sounds/alarm-clock-digital.mp3")
	}else{
		audio = new Audio("sounds/alarm-clock-digital.mp3")
	}

	audio.preload
	audio.load()
	audio.loop = true
	audio.muted = true

	let x = false
	
	if(alarmModal.classList.contains('is-visible')){
		x=true
	}

	if(x !== true){

	alarms.forEach(alarm => {

		const alarmSecPm = alarm.hour.split(" ")
		alarmSecPm[0]= alarmSecPm[0]+':01'

		let alarmPm = alarmSecPm.join(" ")

		//console.log(clock)
		//console.log(alarmPm)

		if(clock === alarmPm){

			let html = `
			<div class="Alert-modal">
				<div class="Alert-info">
					<h2>Alarma Configurada</h2>
					<h2>Descripcion: <span>${alarm.description}</span></h2>
					<h3>Hora: <span>${alarm.hour}</span></h3>
					<div class="Alert-buttons">
					<button data-toggle="alert-button">Entendido</button>
					<button data-toggle="alert-postpone-button">Posponer</button>
					</div>
				</div>
			</div>
			`

			alarmModal.innerHTML = html

			if(alarm?.days.Lun) {
				
				if(date.getDay()==1){
					
					alarmModal.classList.remove('is-hidden')
					alarmModal.classList.add('is-visible')					
					audio.muted = false
					audio.play()

				}

			}

			if(alarm?.days.Mar) {
				
				if(date.getDay()==2){
					
					alarmModal.classList.remove('is-hidden')
					alarmModal.classList.add('is-visible')					
					audio.muted = false
					audio.play()

				}

			}

			if(alarm?.days.Mie) {
				
				if(date.getDay()==3){
					
					alarmModal.classList.remove('is-hidden')
					alarmModal.classList.add('is-visible')					
					audio.muted = false
					audio.play()

				}

			}

			if(alarm?.days.Jue) {
				
				if(date.getDay()==4){
					
					alarmModal.classList.remove('is-hidden')
					alarmModal.classList.add('is-visible')					
					audio.muted = false
					audio.play()

				}

			}

			if(alarm?.days.Vie) {
				
				if(date.getDay()==5){
					
					alarmModal.classList.remove('is-hidden')
					alarmModal.classList.add('is-visible')					
					audio.muted = false
					audio.play()

				}

			}

			if(alarm?.days.Sab) {
				
				if(date.getDay()==6){
					
					alarmModal.classList.remove('is-hidden')
					alarmModal.classList.add('is-visible')					
					audio.muted = false
					audio.play()

				}

			}

			if(alarm?.days.Dom) {
				
				if(date.getDay()==0){
					
					alarmModal.classList.remove('is-hidden')
					alarmModal.classList.add('is-visible')					
					audio.muted = false
					audio.play()

				}

			}
			setAudioProperties(audio)
		}

	})

	}

}

/* secondary clock, full date */ 

const dateFull = document.querySelector('#Date-full');

function subDate(){

	let date = new Date();
	let day = date.getDay();
	let numberDay = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();

	const months = ['Enero','Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio' ,'Julio' , 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	const days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

	dateFull.innerHTML=days[day]+" "+numberDay+" de "+months[month]+" "+year;

}

//content alarms

//alarm days
function alarmsDays(days){

	const daysKeys = Object.keys(days)
	const daysValues = Object.values(days)

	if(daysValues.includes(true)===false){  

		return 

	}else{

	let alarmsRepeat = ''

	if(daysValues.includes(false)===false){
		alarmsRepeat = 'Todos los dias'
	}else if(daysValues.slice(0,5).includes(false)===false && daysValues.slice(5).includes(true) === false){
		alarmsRepeat = 'Entre Semana'
	}else if(daysValues.slice(0,5).includes(true)===false && daysValues.slice(5).includes(false) === false){
		alarmsRepeat = 'Fines de Semana'
	}else{
		alarmsRepeat = daysValues.map((value, index) => {
			if( value === true ) return daysKeys[index]
			return ''
		}).filter(value => value !== '').join('-').toString()
	}

	return alarmsRepeat

	}

}


function alarmsModalForm(){

	html = `
	<legend>Configurar Nueva Alarma</legend>
            <div class="Form-container">
                <label for="description">Descripcion:</label>
                <input type="text" placeholder="Descripción" id="description" name="description" required>
            </div>
			<div class="Form-divider"></div>
            <div class="Form-container">
                <label for="time">Hora:</label>
                <input type="time" id="time" name="hour" required>
            </div>
			<div class="Form-divider"></div>
                <div>
				 <h2>Seleccione los dias en que sonara la alarma:</h2>
                  <label>
                    <input type="checkbox" name="Lun">
                    <span>Lun.</span>
                  </label>
                  <label>
                    <input type="checkbox" name="Mar">
                    <span>Mar.</span>
                  </label>
                  <label>
                    <input type="checkbox" name="Mie">
                    <span>Mié.</span>
                  </label>
                  <label>
                    <input type="checkbox" name="Jue">
                    <span>Jue.</span>
                  </label>
                  <label>
                    <input type="checkbox" name="Vie">
                    <span>Vie.</span>
                  </label>
                  <label>
                    <input type="checkbox" name="Sab">
                    <span>Sáb.</span>
                  </label>
                  <label>
                    <input type="checkbox" name="Dom">
                    <span>Dom.</span>
                  </label>
                </div>
				<div class="Form-buttons">
					<button class="Form-button" data-toggle="close-modal" type="button">Cancelar</button>
					<button class="Form-button" type="submit">Agregar</button>
				</div>
	`

	const addListeners = () => {
		const buttonsCancel = document.querySelectorAll('[data-toggle="close-modal"]')

		buttonsCancel.forEach(button => {
			button.addEventListener('click', () => {

				const modal = document.querySelector('.Modal')
				modal.classList.remove('is-visible')
				modal.classList.add('is-submit')

			})
		})
	}

	return {html,addListeners}
}

function alarmsModalEditForm(id,description,hour){

	const validator = hour.split(" ")
	let hourTransformed = ""

	if(validator[1]==="PM"){

		const hourTransform = hour.split(":")

		if(hourTransform[0]==="12"){

			const time =hour.split(":")
			const timeChanger = parseInt(time[0])
		    time[0]=timeChanger

			hourTransformed = time.join(":")

		}else{
			
			const time =hour.split(":")
			const timeChanger = parseInt(time[0])+12
		    time[0]=timeChanger

			hourTransformed = time.join(":")

		}
	}else{

		const hourTransform = hour.split(":")

		if(hourTransform[0]==="12"){

			const time =hour.split(":")
		    time[0]="00"

			hourTransformed = time.join(":")

		}else{
			

			hourTransformed = hour

		}

	}

	const alarm = getAlarm()

	let Lun,Mar,Mie,Jue,Vie,Sab,Dom

	for(let actualAlarm of alarm){
		if(actualAlarm.id == id){
			if(actualAlarm.days.Lun==true){
				Lun =`checked`
			}else{
				Lun = ``
			}
			if(actualAlarm.days.Mar==true){
				Mar =`checked`
			}else{
				Mar = ``
			}
			if(actualAlarm.days.Mie==true){
				Mie =`checked`
			}else{
				Mie = ``
			}
			if(actualAlarm.days.Jue==true){
				Jue =`checked`
			}else{
				Jue = ``
			}
			if(actualAlarm.days.Vie==true){
				Vie =`checked`
			}else{
				Vie = ``
			}
			if(actualAlarm.days.Sab==true){
				Sab =`checked`
			}else{
				Sab = ``
			}
			if(actualAlarm.days.Dom==true){
				Dom =`checked`
			}else{
				Dom = ``
			}
		}
	}

	html = `
	<legend>Editar Alarma Existente</legend>
		<input type="hidden" id="id" name="id" value="${id}">
            <div class="Form-container">
                <label for="description">Descripcion:</label>
                <input type="text" placeholder="Descripción id="description" name="description" value="${description}" required>
            </div>
			<div class="Form-divider"></div>
            <div class="Form-container">
                <label for="time">Hora:</label>
                <input type="time" id="time" name="hour" value="${hourTransformed.slice(0,-3)}" required>
            </div>
			<div class="Form-divider"></div>
                <div>
				 <h2>Seleccione los dias en que sonara la alarma:</h2>
                  <label>
                    <input type="checkbox" ${Lun} name="Lun">
                    <span>Lun.</span>
                  </label>
                  <label>
                    <input type="checkbox" ${Mar} name="Mar">
                    <span>Mar.</span>
                  </label>
                  <label>
                    <input type="checkbox" ${Mie} name="Mie">
                    <span>Mié.</span>
                  </label>
                  <label>
                    <input type="checkbox" ${Jue} name="Jue">
                    <span>Jue.</span>
                  </label>
                  <label>
                    <input type="checkbox" ${Vie} name="Vie">
                    <span>Vie.</span>
                  </label>
                  <label>
                    <input type="checkbox" ${Sab} name="Sab">
                    <span>Sáb.</span>
                  </label>
                  <label>
                    <input type="checkbox" ${Dom} name="Dom">
                    <span>Dom.</span>
                  </label>
                </div>
				<div class="Form-edit-buttons">
					<button class="Form-edit-button" data-toggle="close-modal" type="button">Cancelar</button>
                	<button class="Form-edit-button" data-toggle="delete-alarm-button" type="button">Eliminar</button>
					<button class="Form-edit-button" type="submit">Guardar</button>
				</div>
	`

	const addListeners = () => {
		const buttonsCancel = document.querySelectorAll('[data-toggle="close-modal"]')

		buttonsCancel.forEach(button => {
			button.addEventListener('click', () => {

				const modal = document.querySelector('.Modal')
				modal.classList.remove('is-visible')
				modal.classList.add('is-submit')

			})
		})

		const buttonDelete = document.querySelector('[data-toggle="delete-alarm-button"]')

		buttonDelete.addEventListener('click', () => {

			const modal = document.querySelector('.Modal')
			modal.classList.remove('is-visible')
			modal.classList.add('is-submit')

			const id = document.querySelector('#id').value

			deleteAlarm(id)
			alert('Alarma Eliminada Exitosamente')
			alarmsRender()
		})
	}

	return {html,addListeners}
}

//alarms doesnt exist
function alarmsEmpty(){
	const html = `
		<div class="Alerts-empty">
			<h2>No se han encontrado Alarmas, comienza colocando algunas para evitar perderte tus tareas diarias o eventos favoritos</h2>
		</div>
	`

	return {html}
}

//alarms list
function alarmsList(alarms){

	let imgSrc

	if(isProduction()){
		imgSrc = "assets/img/boligrafo.png"
	}else{
		imgSrc = "img/boligrafo.png"
	}

	const html = `
	<div class="Alerts-list">
		${alarms.map(alarm => {
			return `
			<div class="Alerts-container">
				<p id="Alerts-description"> ${alarm.description} </p>
				<h3 id="Alerts-time"> ${alarm.hour} 
				<button class="Modal-edit" data-toggle="open-edit-button" data-id="${alarm.id}" data-desc="${alarm.description}" data-hour="${alarm.hour}">
					<img src="${imgSrc}" alt="imagen">
				</button>
				</h3>
				<div class="Alerts-days">
					<p> ${alarmsDays(alarm.days)} </p>
				</div>
			</div>
			`
		}).join('')}
		
	</div>
	` 
	//events for the new elements

	const addListeners = () => {

		const buttons = document.querySelectorAll('[data-toggle="open-modal-button"]')

		buttons.forEach(button => {
			const id = button.getAttribute("data-id")

			button.addEventListener('click', () => {

				const modal = document.querySelector('.Modal')
				modal.classList.add('is-visible')

				const formData =alarmsModalForm()
				const form =document.querySelector('#Alerts-form')
				form.classList.remove('is-hidden')
				const formEdit = document.querySelector('#Alerts-editForm')
				formEdit.classList.add('is-hidden')
				formEdit.innerHTML = ``

				form.innerHTML=formData.html
				formData.addListeners()

			})
		})

		const buttonsCancel = document.querySelectorAll('[data-toggle="open-edit-button"]')

		buttonsCancel.forEach(button => {

			const id = button.getAttribute("data-id")
			const desc = button.getAttribute("data-desc")
			const hour = button.getAttribute("data-hour")

			button.addEventListener('click', () => {

				const modal = document.querySelector('.Modal')
				modal.classList.add('is-visible')

				const formData =alarmsModalEditForm(id,desc,hour)
				const form =document.querySelector('#Alerts-editForm')

				form.innerHTML=formData.html
				form.classList.add('is-visible')
				form.classList.remove('is-hidden')

				const formCreate = document.querySelector('#Alerts-form')
				formCreate.classList.add('is-hidden') 	
				formCreate.innerHTML = ``

				formData.addListeners()

			})
		})
	}

	return {html, addListeners}

}

//alarm render
function alarmsRender(){
	const alarmsContainer = document.querySelector('.Alerts')
	const alarms = getAlarm()

	if(alarms.length === 0){

		const alarmsCount = alarmsEmpty()

		alarmsContainer.classList.add('is-empty')
		alarmsContainer.innerHTML = alarmsCount.html

		const alarmsCount2= alarmsList(alarms)
		alarmsCount2.addListeners()
			
		return
	}

	const alarmsCount= alarmsList(alarms)

	alarmsContainer.innerHTML = alarmsCount.html
	alarmsCount.addListeners()

}

function onTimeChange() {
	const time = document.querySelector('#time')
	var timeSplit =time.value.split(':'),
	  hours,
	  minutes,
	  meridian;
	hours = timeSplit[0];
	minutes = timeSplit[1];

	if(hours>=12){
		hours = hours - 12;
		meridian = "PM";
	  }else{
		meridian = "AM";
	  }
	  if(hours == 0){
		hours = 12;
	}

	return {hours, minutes, meridian}
  }

//alarm create
function alarmCreate(){
	const alarmForm = document.querySelector('#Alerts-form')
	const modal = document.querySelector('.Modal')

	alarmForm.addEventListener('submit',(event) => {

		event.preventDefault()

		const data = new FormData(alarmForm)
		const dataForm = Object.fromEntries(data.entries())

		const timeData = onTimeChange()
		const hour = timeData.hours +":"+timeData.minutes+" "+timeData.meridian
		const description = dataForm.description

		const days = {
			Lun: dataForm?.Lun === 'on' ?? false,
			Mar: dataForm?.Mar === 'on' ?? false,
			Mie: dataForm?.Mie === 'on' ?? false,
			Jue: dataForm?.Jue === 'on' ?? false,
			Vie: dataForm?.Vie === 'on' ?? false,
			Sab: dataForm?.Sab === 'on' ?? false,
			Dom: dataForm?.Dom === 'on' ?? false
		}

		let array = []
		array = Object.values(days)

		if(array.includes(true) === false){

			alert("Ingrese un dia valido")

		}else{
			const newAlarm = {
				description,
				hour,
				days
			}
	
			createAlarm(newAlarm)
	
			alarmForm.reset()
			modal.classList.remove('is-visible')
			modal.classList.add('is-submit')
			alarmsRender()
	
			alert('Alerta Creada con Exito')
		}

	})
}

function alarmEdit(){
	const alertForm = document.querySelector('#Alerts-editForm')
	const modal = document.querySelector('.Modal')

	alertForm.addEventListener('submit',(event) => {

		event.preventDefault()

		const data = new FormData(alertForm)
		const dataForm = Object.fromEntries(data.entries())

		const id = dataForm.id
		const timeData = onTimeChange()
		const hour = timeData.hours +":"+timeData.minutes+" "+timeData.meridian
		const description = dataForm.description

		const days = {
			Lun: dataForm?.Lun === 'on' ?? false,
			Mar: dataForm?.Mar === 'on' ?? false,
			Mie: dataForm?.Mie === 'on' ?? false,
			Jue: dataForm?.Jue === 'on' ?? false,
			Vie: dataForm?.Vie === 'on' ?? false,
			Sab: dataForm?.Sab === 'on' ?? false,
			Dom: dataForm?.Dom === 'on' ?? false
		}

		let array = []
		array = Object.values(days)

		if(array.includes(true) === false){

			alert("Ingrese un dia valido")

		}else{
			const newEditAlarm = {
				id,
				description,
				hour,
				days
			}
	
			editAlarm(newEditAlarm)
	
			alertForm.reset()
			modal.classList.remove('is-visible')
			modal.classList.add('is-submit')
			alarmsRender()
	
			alert('Alerta Editada con Exito')
		}
	})

}

//content modal

//funcion primaria

export function Alarms() {
	alarmClock()
	subDate()
	alarmsRender()
	alarmCreate()
	alarmEdit()
}