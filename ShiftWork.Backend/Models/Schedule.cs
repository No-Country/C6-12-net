namespace ShiftWork.Backend.Models
{
	public class Schedule
	{
		public int ScheduleId { get; set; }
		public int PersonId { get; set; }
		public int TaskShiftId { get; set; }
		public string KeyCode { get; set; }
		public DateTime Scheduledate { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public int AreaId { get; set; }
		public int LocationId { get; set; }
		public string TagColor { get; set; }
		public Person Person { get; set; }
		public TaskShift TaskShift { get; set; }
		public Area Area { get; set; }
		public Location Location { get; set; }

	}
}
