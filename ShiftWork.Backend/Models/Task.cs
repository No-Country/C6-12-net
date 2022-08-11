namespace ShiftWork.Backend.Models
{
    public class Task
    {
        public int IdTask { get; set; }
        public string TaskName { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
