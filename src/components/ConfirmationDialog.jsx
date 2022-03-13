import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({open, guides, setDialog, setSelectedList, setSelected, setHours, handleDeleteGuides}) => {
  return (
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Está seguro que desea eliminar a:
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <ul>
                    {guides.map(x => {
                      return <li><b>{`${x}`}</b></li>
                    })}
                  </ul>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {
                    setDialog()
                    setSelectedList()
                    setSelected()
/*                   setDialog(false)
                  setSelectedList(selectedList.filter(item => item === ""))
                  setSelected([])
                  setHours("") */
                }}>Cancelar</Button>
                <Button onClick={() => {
/*                   handleAgregarHoras() */
                    setDialog()
                    setSelectedList()
                    setSelected()
/*                   setSelectedList(selectedList.filter(item => item === ""))
                  setSelected([])
                  setDialog(false)
                  setHours("") */
                }} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
  )
}

ConfirmationDialog.defaultProps = {
    guides: []
}

export default ConfirmationDialog