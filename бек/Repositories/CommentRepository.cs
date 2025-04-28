using dz1.Data;
using dz1.Model;
using System.Text.Json;

namespace dz1.Repositories


{
    public class CommentRepository : ICommentRepository
    {
        private AppDBContext dBContext;
        private int _lastId = 0;

        public CommentRepository(AppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

       


        public void Add(Comment comment)
        {
            var id = comment.id;
            Comment comment1 = new Comment() { postId = comment.postId, name = comment.name, email = comment.email, body = comment.body };
            dBContext.Comments.Add(comment1);
            dBContext.SaveChanges();
        }

        public void Delete(int id)
        { 
          var deletedItem = dBContext.Comments.FirstOrDefault(x => x.id == id);
            if (deletedItem != null) 
                dBContext.Comments.Remove(deletedItem);

            dBContext.SaveChanges();
        }

        public Comment GetById(int id)
        {
            return dBContext.Comments.FirstOrDefault(x => x.id == id); //Ищет первый элемент в коллекции Comments, удовлетворяющий условию, если такого нет возвращает null
        }

        public void Update(int id, Comment comment)
        {
           var commentId = comment.id;
           var commentFromDB =  dBContext.Comments.FirstOrDefault(x => x.id == commentId);
            if (commentFromDB != null) {
                commentFromDB.postId = comment.postId;
                commentFromDB.name = comment.name;
                commentFromDB.email = comment.email;
                commentFromDB.body = comment.body;
                dBContext.SaveChanges();
            }
            
        }

        public IEnumerable<Comment> GetAll()
        {
            return dBContext.Comments.ToList();
        }
    }
}
