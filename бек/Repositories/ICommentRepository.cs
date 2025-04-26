﻿using dz1.Model;

namespace dz1.Repositories
{
    public interface ICommentRepository
    {
        IEnumerable<Comment> GetAll();
        Comment GetById(int id);
        void Add(Comment comment);
        void Update(int id, Comment comment);
        void Delete(int id);
    }
}

