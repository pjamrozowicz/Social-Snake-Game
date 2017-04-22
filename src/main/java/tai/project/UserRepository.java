package tai.project;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Created by Przemek on 2017-04-22.
 */

public interface UserRepository extends JpaRepository<User,Long>, UserRepositoryCustom {
    List<User> findByLastName(String lastName);
}
