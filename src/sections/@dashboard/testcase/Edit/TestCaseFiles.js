
import { useState } from 'react';
import Editor from "@monaco-editor/react";
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { List, ListItem, Box, ListItemText, MobileStepper, Button, Snackbar, Card, Grid, Stack, Switch, Typography, FormControlLabel, FormGroup, InputLabel, Select, MenuItem, FormControl, TextField } from '@mui/material';
import Iconify from '../../../../components/Iconify';



const fileTypes = {
  css: 'css',
  js: 'javascript',
  json: 'json',
  md: 'markdown',
  mjs: 'javascript',
  ts: 'typescript',
}
const getLanguage = (name) => {
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(name)[1];
  return ext && fileTypes[ext] ? fileTypes[ext] : ''

}


export default function TestCaseFiles({ files, setFile }) {
 

  const deleteFile = (index) => {
    const f = files;
    f.Student = f.Student.filter((a, i) => i !== index)
    f.Solution = f.Student.filter((a, i) => i !== index)
    setFile({ ...f })
  }
  const addFile = () => {
    const f = files;
    f.Student.push({ name: `file${f.index}.txt`, code: '//' })
    f.Solution.push({ name: `file${f.index}.txt`, code: '//' })
    f.index += 1;
    setFile({ ...f })
  }

  const onClick = (type, index) => {
    console.log({ type, index });
    const f = files;
    f.currentFileType = type;
    f.currentFileIndex = index;
    setFile({ ...f })
  }

  const onNameChange = (e) => {
    const { value } = e.target;
    const f = files;
    f.Student[f.currentFileIndex].name = value;
    f.Solution[f.currentFileIndex].name = value;
    setFile({ ...f })

  }

  const onChangeEditor = (v) => {
    const f = files;
    if (f.currentFileType === 'Student') {
      f.Student[f.currentFileIndex].code = v;
    }
    if (f.currentFileType === 'Solution') {
      f.Solution[f.currentFileIndex].code = v;
    }
    if (f.currentFileType === 'Evaluation') {
      f.Evaluation[f.currentFileIndex].code = v;
    }
    setFile({ ...f })
  }



  const RenderFiles = (files, title) => {
    return (<>
      <Typography variant="h6" sx={{ p: 1 }}>
        {title} Files
      </Typography>
      <List dense>
        {
          files.map((f, i) => (
            <ListItem key={i}
              secondaryAction={(title !== 'Student' || i === 0) ? null : <Iconify onClick={() => deleteFile(i)} icon="eva:trash-2-outline" sx={{ color: 'error.dark' }} />}
              onClick={() => onClick(title, i)}
              style={{ cursor: 'pointer' }}

            >
              <ListItemText
                primary={f.name}
              />
            </ListItem>
          ))}
        {title === 'Student' ? <Button onClick={addFile} size="small" variant='text' startIcon={<Iconify icon="eva:plus-circle-outline" sx={{ color: 'parimary.dark' }} />}>Add File</Button> : null}

      </List>

    </>)
  }

  const currentFile = files[files.currentFileType][files.currentFileIndex];

  return (

    <Box style={{ display: 'flex', justifyContent: "space-between" }}>
      <Box style={{ width: 300, backgroundColor: 'grey', padding: 10 }}>
        {RenderFiles(files.Student, 'Student')}
        {RenderFiles(files.Solution, 'Solution')}
        {RenderFiles(files.Evaluation, 'Evaluation')}
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" >
          {files.currentFileType} File
        </Typography>
        {files.currentFileType === 'Student' ? <Typography> The Student will use this file as a starting point to write the Solution..</Typography> : null}
        {files.currentFileType === 'Solution' ? <Typography>Write the Solution to your exercise here, to verify whether your Evaluation code works as expected.</Typography> : null}
        {files.currentFileType === 'Evaluation' ? <Typography>Think about the criteria that define what a good Solution is and write tests that will determine whether the Student’s Solution matches the criteria.</Typography> : null}

        {files.currentFileType === 'Student' ?
          <TextField size='small' fullWidth value={currentFile.name} onChange={onNameChange} sx={{ mb: 1 }} /> : null}
        <Editor
          height="300px"
          theme='vs-dark'
          value={currentFile.code}
          onChange={onChangeEditor}
          language={getLanguage(currentFile.name)}
        />
      </Box>

    </Box>
  );
}
