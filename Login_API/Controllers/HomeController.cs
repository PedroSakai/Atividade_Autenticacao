using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Login_API.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Login_API.Services;
using Login_API.Data;

namespace Login_API.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly LoginContext _context;
        public HomeController(LoginContext context)
        {
            // construtor
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] User usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _context.Usuario
                .Where(u => u.username == usuario.username && u.senha == usuario.senha)
                .FirstOrDefault();
            
            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });
            
            var token = TokenService.GenerateToken(user);
            user.senha = "";
            
            return new
            {
                user = user,
                token = token
            };
        }
    }
}