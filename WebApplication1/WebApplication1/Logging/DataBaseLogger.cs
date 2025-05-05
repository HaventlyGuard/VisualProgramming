using WebApplication1.Model;
using WebApplication1.Repositories;

namespace WebApplication1.Logging
{
    public class DatabaseLogger : ILogger
    {
        private readonly CommentContext _context;
        private readonly string _categoryName;

        public DatabaseLogger(CommentContext context, string categoryName)
        {
            _context = context;
            _categoryName = categoryName;
        }
//Реализует интерфейс ILogger, что не исп ставим null
        public IDisposable BeginScope<TState>(TState state) => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        // Основной метод логирования, который вызывается при каждом логировании
        public void Log<TState>(
            LogLevel logLevel,        // Уровень логирования (Information, Warning, Error и т.д.)
            EventId eventId,          // Идентификатор события
            TState state,             // Состояние для логирования
            Exception exception,      // Исключение, если оно есть
            Func<TState, Exception, string> formatter) // Функция для форматирования сообщения
        {
            if (formatter == null) return;

            var message = formatter(state, exception);
            _context.Logs.Add(new Log
            {
                Level = logLevel.ToString(),
                Message = message,
                Exception = exception?.ToString(),
                Source = _categoryName
            });
            _context.SaveChanges();
        }
    }
}
