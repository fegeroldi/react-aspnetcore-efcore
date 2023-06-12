using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades.ToList();
        }

        [HttpGet("{id:int}")]
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
        }

        [HttpPost]
        public Atividade Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);
            if(_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(x => x.Id == atividade.Id);
            else
                throw new System.Exception("Erro ao adicionar nova atividade.");            
        }

        [HttpPut("{id:int}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if(atividade.Id != id)
                throw new System.Exception("ID de atividade difere da atividade para ser atualizada");

            _context.Update(atividade);
            if(_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            else
                return new Atividade();
        }


        [HttpDelete("{id:int}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            if(atividade == null)
                throw new System.Exception("A atividade informada não existe");
            
            _context.Remove(atividade);
            return _context.SaveChanges() > 0;
        }
    }
}