package br.com.isidrocorp.dashcard.dao;

import org.springframework.data.repository.CrudRepository;
import br.com.isidrocorp.dashcard.model.Usuario;

public interface UsuarioDAO extends CrudRepository <Usuario, Integer>{
	// este metodo segue a estratégia QueryByMethodName, ou seja, se seguirmos o padrao do JPA, ele irá
	//decodificar este metodo da seguinte maneira:
	//findBy           => select
	//Emain and Senha  => Where email = ? and senha = ?
	public Usuario findByEmailAndSenha(String email, String senha);
	
	public Usuario findByEmailOrRacf(String email, String racf);
	
}
