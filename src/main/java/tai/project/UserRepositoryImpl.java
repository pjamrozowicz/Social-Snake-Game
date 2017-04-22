package tai.project;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by Przemek on 2017-04-22.
 */

public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void customRepoMethod(String argument) {
        System.out.println("custom method invoked");
    }
}
