﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ShiftWork.Backend.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ShiftWorkContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ShiftWorkContext") ?? throw new InvalidOperationException("Connection string 'ShiftWorkContext' not found.")));



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseDeveloperExceptionPage();
    //app.UseMigrationsEndPoint();
}


//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;

//    var context = services.GetRequiredService<ShiftWorkContext>();
//    context.Database.EnsureCreated();
//    //DbInitializer.Initialize(context);
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
