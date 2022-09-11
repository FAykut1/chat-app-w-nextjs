import ChatRoomItem from './ChatRoomItem';

import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import SyncIcon from '@mui/icons-material/Sync';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  onSnapshot,
  query,
  QuerySnapshot,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { IRoom } from '../types/data';
import { auth, database } from '../utils/firebase';

const Drawer: React.FC<{
  selectRoom: (roomId: string | undefined) => void;
}> = ({ selectRoom }) => {
  const roomCollection = collection(
    database,
    'rooms'
  ) as CollectionReference<IRoom>;

  const user = useUser();

  const [isLoading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<{ [key: string]: IRoom }>({});
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    console.log(user.uid);
    const unsub = onSnapshot(
      query(roomCollection, where('users', 'array-contains', user.uid)),
      (snapshot: QuerySnapshot<IRoom>) => {
        snapshot.docChanges().forEach((docRoom) => {
          const room = docRoom.doc.data();
          room.id = docRoom.doc.id;
          if (!room.createAt && !room.updateAt) {
            room.createAt = new Date();
            room.updateAt = new Date();
          } else {
            room.createAt = new Date(room.createAt.seconds * 1000);
            room.updateAt = new Date(room.updateAt.seconds * 1000);
          }
          if (docRoom.type === 'removed') {
            delete rooms[room.id];
          } else {
            rooms[room.id] = room;
          }
          console.log(rooms);
        });
        setRooms({ ...rooms });
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  const createRoomBtnClick = () => {
    setDialogOpen(true);
  };

  const createRoomDialogSubmit = () => {
    const roomText = document.getElementById(
      'roomNameText'
    ) as HTMLInputElement;

    if (user && roomText.value) {
      const roomData: IRoom = {
        name: roomText.value,
        users: [user.uid],
        type: 'GROUP',
        updateAt: serverTimestamp(),
        createAt: serverTimestamp(),
      };
      addDoc(roomCollection, roomData);
      setDialogOpen(false);
    }
  };

  const createRoomDialogClose = () => {
    setDialogOpen(false);
  };

  const logoutBtnClick = () => {
    signOut(auth);
  };

  return (
    <div className="w-80 h-screen bg-second relative">
      <div className="h-20 bg-second p-4 flex items-center justify-between">
        <div className="font-bold">Awesome Chat-App</div>
        <div
          onClick={createRoomBtnClick}
          className="p-2 rounded border hover:bg-first hover:cursor-pointer"
        >
          <GroupsIcon />
        </div>
        <div
          onClick={logoutBtnClick}
          className="p-2 rounded border hover:bg-first hover:cursor-pointer"
        >
          <LogoutIcon />
        </div>
      </div>
      <div className="">
        {Object.values(rooms).map((room) => (
          <ChatRoomItem
            onClick={() => selectRoom(room.id)}
            key={room.id}
            room={room}
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onClose={createRoomDialogClose}>
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <DialogContentText>Create room and start messaging</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="roomNameText"
            label="Room name"
            type="text"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={createRoomDialogClose}>Cancel</Button>
          <Button onClick={createRoomDialogSubmit}>Create</Button>
        </DialogActions>
      </Dialog>

      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SyncIcon fontSize="large" className="animate-spin" />
        </div>
      ) : null}
    </div>
  );
};

export default Drawer;
