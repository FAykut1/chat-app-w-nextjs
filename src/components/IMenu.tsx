import { Menu, MenuItem } from '@mui/material';

const IMenu: React.FC<{
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  children: JSX.Element[];
}> = ({ anchorEl, handleClose, children }) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      PaperProps={{
        style: {
          backgroundColor: '#222831',
          color: 'white',
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default IMenu;
