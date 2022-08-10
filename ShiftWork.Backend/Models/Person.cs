namespace ShiftWork.Backend.Models
{
    public class Person
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DocumentNumber { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Email { get; set; }   
        public int PhoneNumber { get; set; }
    }
}
