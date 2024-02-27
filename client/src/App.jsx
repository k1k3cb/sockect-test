import { useEffect, useState } from 'react';
import { socket } from './sockets/socket';
import { GlobalStyles } from './styles/GlobalStyles';
const App = () => {
	console.log(socket);
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		socket.on('new counter value', counterValue => {
			setCounter(counterValue);
		});
	}, []);
	useEffect(() => {
		socket.emit('counter', counter);
	}, [counter]);




	useEffect(() => {
		socket.on('users', allUsers => {
			setConnectedUsers(allUsers);
		});
	}, []);

	

	// emit('evento que emite', datoQueEnvía)

	// on('evento que escuchan', datoQueRecibe=>{

	// })

	return (
		<>
			<GlobalStyles />
			<h2>{counter}</h2>
			<button onClick={() => counterAdd(counter, setCounter, socket)}>
				+1
			</button>
			<button onClick={() => resetCounter(setCounter, socket)}>Reset</button>
			<button onClick={() => counterSubstract(counter, setCounter, socket)}>
				-1
			</button>

			<h3>Usuarios Conectados:</h3>
			<ul>
				{connectedUsers.map(user => (
					<li key={user}>{user}</li>
				))}
			</ul>
		</>
	);
};

const counterAdd = (counter, setCounter) => {
	setCounter(counter + 1);
};

const counterSubstract = (counter, setCounter) => {
	setCounter(counter - 1);
};

const resetCounter = (setCounter, socket) => {
	setCounter(0);
	socket.emit('counter', 0);
};

export default App;
