import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Logo from '../../Imagenes/Logo-Duende.png';
import './Agenda.css';
import {
	Inject,
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	ViewsDirective,
	ViewDirective,
	DragAndDrop,
	Resize,
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

import { registerLicense } from '@syncfusion/ej2-base';
import axios from 'axios';

registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGRGfV5yd0VHYlZQRHxeSk0SNHVRdkdgWH5fd3RVR2FYVkx2Vko=',
);

const Scheduler = () => {
	const [eventTypes, setEventTypes] = useState({});
	const [shouldFetchData, setShouldFetchData] = useState(true);
	const [localData, setLocalData] = useState([]);
	const fetchData = async () => {
		try {
			const response = await axios.get(
				'http://localhost:3500/appointments/getAll',
			);
			if (Array.isArray(response.data)) {
				setLocalData(response.data);
			} else {
				console.error(
					'La respuesta de la API no es un arreglo:',
					response.data,
				);
			}
		} catch (error) {
			console.error('Error al obtener datos de la API:', error);
		}
	};

	useEffect(() => {
		if (shouldFetchData) {
			fetchData();
			setShouldFetchData(false); // Resetear el estado después de la carga de datos
		}
	}, [shouldFetchData]);

	const fieldsData = {
		id: 'Id',
		Subject: { name: 'Subject', validation: { required: true } },
		EventType: { name: 'EventType', validation: { required: true } },
		Details: { name: 'Details', validation: { required: true } },
		StartTime: { name: 'StartTime', validation: { required: true } },
		EendTime: { name: 'EndTime', validation: { required: true } },
		CustomerName: { name: 'CustomerName' },
		ReferenceService: { name: 'ReferenceService' },
		OrderNumber: { name: 'OrderNumber' },
		DeliveryCustomerName: { name: 'DeliveryCustomerName' },
	};
	const onDragStart = args => {
		//args.scroll = { enabled: false };
		args.interval = 10;
	};

	const onResizeStart = args => {
		//args.scroll = { enabled: false };
		args.interval = 10;
	};

	const handleActionBegin = async args => {
		if (
			!['eventCreate', 'eventChange', 'eventRemove'].includes(args.requestType)
		) {
			setShouldFetchData(true);
			return;
		}
		const eventData =
			args.data && args.data instanceof Array ? args.data[0] : args.data;

		if (!eventData) {
			console.error('No se encontraron datos de evento.');
			setShouldFetchData(true);
			return;
		}
		console.log('EventData:', eventData);

		// Verificar superposición para eventos nuevos o modificados
		if (
			args.requestType === 'eventCreate' ||
			args.requestType === 'eventChange'
		) {
			const { StartTime, EndTime, Id } = eventData;

			const inicio = new Date(StartTime);
			const fin = new Date(EndTime);

			// Función para verificar si un evento se superpone con otros eventos
			const esEventoSuperpuesto = (inicio, fin, idEvento = null, _id) => {
				const superposicion = localData.some(evento => {
					if (idEvento !== evento.Id) {
						if (evento._id === _id) {
							return false;
						}
						// Ignorar el evento actual si se está editando
						const inicioEvento = new Date(evento.StartTime);
						const finEvento = new Date(evento.EndTime);

						const seSuperpone = inicio < finEvento && fin > inicioEvento;

						return seSuperpone;
					}

					return false;
				});

				return superposicion;
			};

			// Verificar si el evento actual se superpone con otros
			const eventoSuperpuesto = esEventoSuperpuesto(
				inicio,
				fin,
				Id,
				eventData._id,
			);

			if (eventoSuperpuesto) {
				const esCita = eventData.EventType === 'Cita';

				// Verificar si alguno de los eventos superpuestos es de tipo "Cita"
				const superposicionConCita = localData.some(evento => {
					return (
						evento.EventType === 'Cita' &&
						((inicio < new Date(evento.EndTime) &&
							fin > new Date(evento.StartTime)) ||
							(inicio <= new Date(evento.StartTime) &&
								fin >= new Date(evento.EndTime)))
					);
				});

				if (esCita || superposicionConCita) {
					alert('No se pueden superponer eventos con citas.');
					args.cancel = true;
					return;
				}

				// Si no es una cita pero hay superposición con otros tipos de eventos, pedir confirmación
				if (
					!window.confirm(
						'Hay una colisión con otro evento. ¿Deseas continuar?',
					)
				) {
					args.cancel = true;
					return;
				}
			}
		}

		const isUpdate = eventData._id != null;
		const apiEndpoint = isUpdate ? '/update' : '/create';

		if (
			args.requestType === 'eventCreate' ||
			args.requestType === 'eventChange'
		) {
			args.cancel = true;

			try {
				const response = await axios({
					method: isUpdate ? 'put' : 'post',
					url: `http://localhost:3500/appointments${apiEndpoint}`,
					data: eventData,
				});

				console.log('API response for save', response); // Para depuración
				setShouldFetchData(true);
			} catch (error) {
				console.error('Error al guardar los datos del evento:', error);
				console.log('Error data', error.response || error.message);
			}
		} else if (args.requestType === 'eventRemove') {
			args.cancel = true;
			const eventId = eventData._id;
			console.log('event id ', eventId);

			if (!eventId) {
				console.error('No se pudo obtener el ID del evento para eliminar.');
				return;
			}

			try {
				const response = await axios.delete(
					'http://localhost:3500/appointments/delete',
					{
						data: { id: eventId },
					},
				);

				console.log('API response for delete', response); // Para depuración

				setShouldFetchData(true);
			} catch (error) {
				console.error('Error al eliminar el evento:', error);
				console.log('Error data', error.response || error.message); // Para depuración
			}
		}
	};

	const Cita = props => {
		//console.log('Cita props', props);
		//console.log(Object.keys(props).length);

		return (
			<table className='custom-event-editor'>
				<tbody>
					<tr>
						<td className='e-textlabel'>Evento</td>
						<td>
							<input
								id='Summary'
								name='Subject'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Tipo</td>
						<td>
							<DropDownListComponent
								id='EventType'
								dataSource={['Entrega', 'Cita', 'Otro']}
								placeholder='Escoge el tipo'
								data-name='EventType'
								value={eventTypes[props.Id]}
								className='e-field'
								enabled={
									Object.keys(props).length <= 0 ||
									Object.keys(props).length == 3
								}
								change={e => {
									setEventTypes(prevEventTypes => ({
										...prevEventTypes,
										[props.Id]: e.value,
									}));
								}}
							></DropDownListComponent>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Nombre del Cliente</td>
						<td>
							<input
								id='CustomerName'
								name='CustomerName'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Servicio</td>
						<td>
							<input
								id='ReferenceService'
								name='ReferenceService'
								type='text' // Puedes cambiar esto según tus necesidades
								className='e-field e-input'
							/>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>De</td>
						<td>
							<DateTimePickerComponent
								id='StartTime'
								data-name='StartTime'
								value={new Date(props.startTime || props.StartTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Hasta</td>
						<td>
							<DateTimePickerComponent
								id='EndTime'
								data-name='EndTime'
								value={new Date(props.endTime || props.EndTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Detalles</td>
						<td>
							<textarea
								id='Details'
								name='Details'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	};
	const Entrega = props => {
		//console.log('Entrega props', props);
		//console.log(Object.keys(props).length);

		return (
			<table className='custom-event-editor'>
				<tbody>
					<tr>
						<td className='e-textlabel'>Evento</td>
						<td>
							<input
								id='Summary'
								name='Subject'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Tipo</td>
						<td>
							<DropDownListComponent
								id='EventType'
								dataSource={['Entrega', 'Cita', 'Otro']}
								placeholder='Escoge el tipo'
								data-name='EventType'
								value={eventTypes[props.Id]}
								className='e-field'
								enabled={
									Object.keys(props).length <= 0 ||
									Object.keys(props).length == 3
								}
								change={e => {
									setEventTypes(prevEventTypes => ({
										...prevEventTypes,
										[props.Id]: e.value,
									}));
								}}
							></DropDownListComponent>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Número de Pedido</td>
						<td>
							<input
								id='OrderNumber'
								name='OrderNumber'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Nombre del Cliente</td>
						<td>
							<input
								id='DeliveryCustomerName'
								name='DeliveryCustomerName'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>De</td>
						<td>
							<DateTimePickerComponent
								id='StartTime'
								data-name='StartTime'
								value={new Date(props.startTime || props.StartTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Hasta</td>
						<td>
							<DateTimePickerComponent
								id='EndTime'
								data-name='EndTime'
								value={new Date(props.endTime || props.EndTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Detalles</td>
						<td>
							<textarea
								id='Details'
								name='Details'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	};
	const Otra = props => {
		//console.log('Otra props', props);
		//console.log(Object.keys(props).length);
		return (
			<table className='custom-event-editor'>
				<tbody>
					<tr>
						<td className='e-textlabel'>Evento</td>
						<td>
							<input
								id='Summary'
								name='Subject'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Tipo</td>
						<td>
							<DropDownListComponent
								id='EventType'
								dataSource={['Entrega', 'Cita', 'Otro']}
								placeholder='Escoge el tipo'
								data-name='EventType'
								value={eventTypes[props.Id]}
								className='e-field'
								enabled={
									Object.keys(props).length <= 0 ||
									Object.keys(props).length == 3
								}
								change={e => {
									setEventTypes(prevEventTypes => ({
										...prevEventTypes,
										[props.Id]: e.value,
									}));
								}}
							></DropDownListComponent>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>De</td>
						<td>
							<DateTimePickerComponent
								id='StartTime'
								data-name='StartTime'
								value={new Date(props.startTime || props.StartTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Hasta</td>
						<td>
							<DateTimePickerComponent
								id='EndTime'
								data-name='EndTime'
								value={new Date(props.endTime || props.EndTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Detalles</td>
						<td>
							<textarea
								id='Details'
								name='Details'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	};
	return (
		<>
			<NavBar
				imagen={Logo}
				pathMain='MainPageAdmin'
				pathCarrito='CarritoDeCompras'
				pathCuenta='CuentaAdmin'
				pathGaleria='GalleryAdmin'
				pathTienda='MainPageEcomerceAdmin'
				mostrarCarrito={false}
			/>

			<ScheduleComponent
				currentView='Month'
				eventSettings={{
					dataSource: localData,
					fields: fieldsData,
				}}
				dragStart={onDragStart}
				resizeStart={onResizeStart}
				showQuickInfo={false}
				editorTemplate={props =>
					eventTypes[props.Id] === 'Cita'
						? Cita(props)
						: eventTypes[props.Id] === 'Entrega'
						? Entrega(props)
						: Otra(props)
				}
				eventRendered={props => {
					const eventType = props.data.EventType;

					let color = '';
					switch (eventType) {
						case 'Cita':
							color = 'rgba(25, 130, 196, 0.3)'; // Azul con menos opacidad
							break;
						case 'Entrega':
							color = 'rgba(255, 206, 86, 0.3)'; // Amarillo con menos opacidad
							break;
						default:
							color = 'rgba(106, 76, 147, 0.3)'; // Púrpura con menos opacidad
					}

					props.element.style.backgroundColor = color;
					props.element.style.border = `1px solid ${color.replace('0.3', '1')}`; // Borde con opacidad completa
					props.element.style.color = 'black';
				}}
				actionBegin={handleActionBegin} // Añade el manejador de acción aquí
			>
				<ViewsDirective>
					<ViewDirective
						option='Day'
						startHour='01:00'
						interval={3}
					></ViewDirective>
					<ViewDirective option='Week'></ViewDirective>
					<ViewDirective
						option='Month'
						showWeekNumber={true}
						isSelected={true}
					></ViewDirective>
					<ViewDirective option='Agenda'></ViewDirective>
				</ViewsDirective>

				<Inject
					services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
				/>
			</ScheduleComponent>
		</>
	);
};
export default Scheduler;
