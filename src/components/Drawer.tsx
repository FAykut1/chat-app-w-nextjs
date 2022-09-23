import ChatRoomItem from './ChatRoomItem';
import MenuIcon from '@mui/icons-material/Menu';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import SyncIcon from '@mui/icons-material/Sync';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { IRoom } from '../types/data';
import { auth, database } from '../utils/firebase';
import IconButton from './IconButton';

const dialogRoomTextId = 'dialogRoomTextId';

enum RoomChoice {
  CREATE = 'CREATE',
  JOIN = 'JOIN',
}

const Drawer: React.FC<{}> = () => {
  const roomCollection = collection(
    database,
    'rooms'
  ) as CollectionReference<IRoom>;

  const user = useUser();

  const [isLoading, setLoading] = useState(true);
  const [createOrJoin, setCreateOrJoin] = useState<RoomChoice>(
    RoomChoice.CREATE
  );

  const [rooms, setRooms] = useState<{ [key: string]: IRoom }>({});
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      query(roomCollection, where('users', 'array-contains', user.uid)),
      (snapshot: QuerySnapshot<IRoom>) => {
        snapshot.docChanges().forEach((docRoom) => {
          const room = docRoom.doc.data();
          room.id = docRoom.doc.id;
          if (!room.createAt && !room.updateAt) {
            room.createAt = Date.now();
            room.updateAt = Date.now();
          } else {
            room.createAt = room.createAt.seconds * 1000;
            room.updateAt = room.updateAt.seconds * 1000;
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

  const handleRoomButtons = (choice: RoomChoice) => {
    handleMenuClose();
    setCreateOrJoin(choice);
    setDialogOpen(true);
  };

  const roomDialogSubmit = () => {
    if (createOrJoin === RoomChoice.CREATE) {
      createRoom();
    } else {
      joinRoom();
    }
    setDialogOpen(false);
  };

  const createRoom = () => {
    const roomText = document.getElementById(
      dialogRoomTextId
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
    }
  };

  const joinRoom = async () => {
    const roomText = document.getElementById(
      dialogRoomTextId
    ) as HTMLInputElement;

    const roomId = roomText.value;
    if (!roomId) return;

    const docRef = doc(roomCollection, roomId);
    const roomDoc = await getDoc(docRef);
    const room = roomDoc.data();

    if (room && user && user.uid) {
      room.users.push(user.uid);
      await updateDoc(docRef, {
        users: room.users,
      });
    } else {
      alert('User or room not found');
    }
  };

  const roomDialogClose = () => {
    setDialogOpen(false);
  };

  const logoutBtnClick = () => {
    signOut(auth);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full sm:w-80 h-full bg-second relative">
      <div className="h-20 bg-second p-4 flex items-center justify-between">
        <div className="font-bold">Awesome Chat-App</div>
        <div className="">
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleRoomButtons(RoomChoice.JOIN)}>
              Join Group
            </MenuItem>
            <MenuItem onClick={() => handleRoomButtons(RoomChoice.CREATE)}>
              Create Group
            </MenuItem>
            <MenuItem onClick={logoutBtnClick}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="">
        {Object.values(rooms).map((room) => (
          <ChatRoomItem key={room.id} room={room} />
        ))}
      </div>

      <Dialog open={isDialogOpen} onClose={roomDialogClose}>
        <DialogTitle>{createOrJoin + ' '} ROOM</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id={dialogRoomTextId}
            label={createOrJoin === RoomChoice.CREATE ? 'Room name' : 'Room ID'}
            type="text"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={roomDialogClose}>Cancel</Button>
          <Button onClick={roomDialogSubmit}>{createOrJoin}</Button>
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

const DrawerHeaderButton: React.FC<{
  onClick?: () => void;
  children: JSX.Element;
}> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="p-1 rounded border hover:bg-first hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Drawer;
