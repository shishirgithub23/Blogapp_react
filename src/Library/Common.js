
export default function GetDate(date)
{
    debugger
   var date= new Date(date)
    if(date!=null)
    {
        var year =date.getFullYear()
        var month=date.getMonth()+1
        var day= date.getDate()
        return `${year}-${month}-${day}`
    }   
    else 
    {
        return '';
    }
}

export function GetDateTime(date_)
{
    const date = new Date(date_);
    var timeString="";
    if(date!=undefined && date!=null)
    {
        const hours = date.getHours();
        const amOrPm = hours < 12 ? 'AM' : 'PM';
        const formattedHours = (hours % 12) || 12;
        const formattedMinutes = date.getMinutes().toString().padStart(2, '0');
        const formattedSeconds = date.getSeconds().toString().padStart(2, '0');
        timeString = `${GetDate(date_)}${" "}${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    }
    return timeString;
}