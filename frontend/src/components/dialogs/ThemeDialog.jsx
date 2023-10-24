import React, { useContext, useState } from "react";
import {
  Dialog,
  Slide,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

import { useTheme } from "@emotion/react";
import { GlobalContext } from "../../contexts/GlobalContexts";
import SettingColorPresets from "../../theme/ThemeColorSettings";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ThemeDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const [selectedTheme, setselectedTheme] = useState(theme.palette.mode);
  const [selectedColor, setSelectedColor] = useState("");

  const { onChangeMode, onChangeColor } = useContext(GlobalContext);

  const onApply = (event) => {
    if (selectedTheme) onChangeMode(selectedTheme);
    //Added timer to delay state change for fixing theme color not changing issue
    setTimeout(() => {
      if (selectedColor) onChangeColor(selectedColor);
    }, 100);
    handleClose();
    event.preventDefault();
  }
  const handleChangeTheme = (event) => {
    setselectedTheme(event.target.value);
  };

  const handleChangeColor = (event) => {
    setSelectedColor(event.target.value);
  }


  return (
    <>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{"Choose Theme"}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mb: 2 }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedTheme}
              onChange={handleChangeTheme}
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="system"
                control={<Radio />}
                label="System Default"
              />
            </RadioGroup>
          </FormControl>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Presets</Typography>
            <SettingColorPresets selectedColor={selectedColor} handleChange={handleChangeColor} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={onApply}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ThemeDialog;
