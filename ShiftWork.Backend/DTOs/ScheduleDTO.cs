namespace ShiftWork.Backend.DTOs
{
    public class ScheduleDto
    {
		public string ScheduleId { get; set; }
		public int PersonId { get; set; }
		public string TaskShiftId { get; set; }
		public string KeyCode { get; set; }
		public DateTime Scheduledate { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public int AreaId { get; set; }
		public int LocationId { get; set; }
		public string TagColor { get; set; }
	}
}
