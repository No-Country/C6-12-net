namespace ShiftWork.Backend.Models
{
    public class Area
    {
        public int AreaId { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<Schedule> Schedules { get; set; }
    }
}
