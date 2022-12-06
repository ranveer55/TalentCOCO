import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';



export default function LanguageSelect(props) {
  const { onClose, open, languages } = props;

 

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog  open={open} >
      <DialogTitle>Select Language</DialogTitle>
      <List sx={{ pt: 0 }}>
        {languages.map((language) => (
          <ListItem button onClick={() => handleListItemClick(language)} key={language}>

            <ListItemText primary={language} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}