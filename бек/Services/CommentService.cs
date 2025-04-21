using dz1.Repositories;
using dz1.Model;

namespace dz1.Services
{
    public class CommentService
    {
        private readonly ICommentRepository _commentRepository;
        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public void AddComment(Comment comment)
        {
            _commentRepository.Add(comment);
        }

        public Comment GetCommentById(int id)
        {
            return _commentRepository.GetById(id);
        }

        public void DeleteComment(int id)
        {
            _commentRepository.Delete(id);
        }

        public void UpdateComment(int id, Comment comment)
        {
            _commentRepository.Update(id, comment);
        }

        public IEnumerable<Comment> GetAllComments()
        {
            return _commentRepository.GetAll();
        }
    }
}
