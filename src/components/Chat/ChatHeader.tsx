import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setRoom, updateInvite } from '../../features/chat/roomSlice';
import { extractTime } from '../../utils/utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const ChatHeader: React.FC<{}> = () => {
  const room = useAppSelector((state) => state.room.value);
  const dispatch = useAppDispatch();

  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInviteBtn = async () => {
    handleMenuClose();
    if (!room) return;
    const res = await fetch('/api/invite', {
      method: 'POST',
      body: JSON.stringify({ roomId: room?.id }),
    });
    const invite = await res.json();
    dispatch(updateInvite(invite));
    setCopied(false);
    setDialogOpen(true);
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

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: '#393E46',
            color: 'white',
          },
        }}
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle align="center">Invite Code</DialogTitle>
        <DialogContent className="flex justify-center items-center">
          {room?.invite?.inviteCode ? (
            <CopyToClipboard
              text={room.invite.inviteCode}
              onCopy={() => setCopied(true)}
            >
              <div className="flex items-center hover:cursor-pointer hover:bg-[#0d0d0d] border rounded px-4 py-3">
                <button className="pr-2">{room.invite.inviteCode}</button>
                {copied ? <DoneIcon /> : <ContentCopyIcon />}
              </div>
            </CopyToClipboard>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
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
