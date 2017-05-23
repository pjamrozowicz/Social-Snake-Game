package tai.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Przemek on 2017-04-22.
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository repository;

    @Autowired
    public DatabaseLoader(UserRepository repository) {

        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new User(123456L, "Przemek", "Ziomek", "male"));
        List<User> userList = repository.findByLastName("Ziomek");
        userList.forEach(System.out::println);
    }
}
