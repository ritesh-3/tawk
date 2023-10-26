import { useDispatch, useSelector } from "react-redux";
import MyRouter from './router/MyRouter'
import { Alert, Snackbar } from "@mui/material";
import { closeFunDialog, closeSnackBar } from "./redux/slices/app";
import customLogger from "./utils/logger";
import FunnyDialog from "./components/dialogs/FunnyDialog";
function App() {
  // customLogger.trace("App Component Loading","App()")
  const dispatch = useDispatch();
  const { snackbar: { severity, message, open }, showFunDialog } = useSelector((state) => state.app)
  const vertical = "top";
  const horizontal = "center";
  return (
    <>
      <MyRouter />
      {
        showFunDialog &&
        <FunnyDialog
          open={showFunDialog}
          onClose={() => dispatch(closeFunDialog())}
        />
      }

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
