const months = new Map();
months.set("Jan", "01")
months.set("Feb", "02")
months.set("Mar", "03")
months.set("Apr", "04")
months.set("May", "05")
months.set("Jun", "06")
months.set("Jul", "07")
months.set("Aug", "08")
months.set("Sep", "09")
months.set("Oct", "10")
months.set("Nov", "11")
months.set("Dec", "12")

export function formatDate(value){
    const y = new Date().getFullYear();
    let finalDate = "invalid";
    let date = value.toString().split(" ")

    if (y >= date[3]) {
        finalDate = date[3]+"-"+months.get(date[1])+"-"+date[2]
    }

    return finalDate;
}