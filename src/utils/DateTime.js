export function getDateTime(){
    let time = new Date();
    let date = new Date();
    let dateTime = date.toLocaleDateString('en-US')+" "+time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
    return dateTime;
}