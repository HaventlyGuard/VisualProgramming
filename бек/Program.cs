using dz1.Data;
using dz1.Model;
using dz1.Repositories;
using dz1.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
string StringConnetcion = builder.Configuration.GetConnectionString("WebApiDatabase");

//builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(StringConnetcion));
builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(StringConnetcion), ServiceLifetime.Singleton); //входной параметр (типа DbContextOptionsBuilder)
builder.Services.AddSingleton<CommentService>();
builder.Services.AddSingleton<ICommentRepository, CommentRepository>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();
app.UseCors();

app.MapGet("/comments", (CommentService commentService) => commentService.GetAllComments());
app.MapGet("/comments/{id}", (int id, CommentService commentService) => commentService.GetCommentById(id));
app.MapPost("/comments", (Comment comment, CommentService commentService) =>
{
    commentService.AddComment(comment);
    return Results.Ok(comment);
});
app.MapPatch("/comments/{id}", (int id, Comment comment, CommentService commentService) => commentService.UpdateComment(id, comment));
app.MapDelete("/comments/{id}", (int id, CommentService commentService) => commentService.DeleteComment(id));

app.Run();
