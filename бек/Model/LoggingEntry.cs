namespace dz1.Model
{
    public class LoggingEntry
    {
        public int Id { get; set; }
        public DateTime Times { get; set; }
        public string Level { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }
        public string Logger { get; set; }
        public string Url { get; set; }
        public string Action { get; set; }
    }
}
