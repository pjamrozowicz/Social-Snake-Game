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
        System.out.println(this.repository.findAll());
    }
}
