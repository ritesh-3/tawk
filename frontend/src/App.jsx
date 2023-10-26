import { useDispatch, useSelector } from "react-redux";
import MyRouter from './router/MyRouter'
import { Alert, Snackbar } from "@mui/material";
import { closeSnackBar } from "./redux/slices/app";
import customLogger from "./utils/logger";
function App() {
 // customLogger.trace("App Component Loading","App()")
  const dispatch = useDispatch();
  const { severity, message, open } = useSelector(
    (state) => state.app.snackbar
  );
  const vertical = "top";
  const horizontal = "center";
  return (
    <>
      <MyRouter />
      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}

          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {

            dispatch(closeSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(closeSnackBar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  )
}

export default App
