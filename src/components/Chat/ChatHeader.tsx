import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setRoom } from '../../features/chat/roomSlice';
import { extractTime } from '../../utils/utils';

const ChatHeader: React.FC<{}> = () => {
  const room = useAppSelector((state) => state.room.value);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInviteBtn = () => {
    handleMenuClose();
  };

  return (
    <div className="z-50 absolute left-0 right-0 top-0 bg-second p-4 flex justify-between">
      <div className="flex items-center">
        <IconButton onClick={() => dispatch(setRoom(null))}>
          <ArrowBackIcon />
        </IconButton>
        <div className="p-2"></div>
        <div>
          <div className="font-semibold">{room?.name}</div>
          <div className="text-tsecond">{extractTime(room?.updateAt)}</div>
        </div>
      </div>
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
          <MenuItem onClick={handleInviteBtn}>Invite</MenuItem>
          <MenuItem onClick={handleMenuClose}>Change Name</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

const IconButton: React.FC<{
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: JSX.Element;
}> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="back-icon p-2 rounded-full hover:bg-first hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default ChatHeader;
