import { useEffect, useState } from 'react';
import { socket } from './sockets/socket';
import { GlobalStyles } from './styles/GlobalStyles';
const App = () => {
	console.log(socket);
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		socket.on('counter', newCounter => {
			console.log(newCounter);
		});

		socket.on('userConnected', (users) => {
			console.log(users);
		  });
	}, []);
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
		</>
	);
};

const counterAdd = (counter, setCounter, socket) => {
	const newCounter = counter + 1;
	setCounter(newCounter);
	socket.emit('counter', newCounter);
};

const counterSubstract = (counter, setCounter, socket) => {
	const newCounter = counter - 1;
	setCounter(newCounter);
	socket.emit('counter', newCounter);
};

const resetCounter = (setCounter, socket) => {
	setCounter(0);
	socket.emit('counter', 0);
};

export default App;

// lista usuarios conectados y un contador
