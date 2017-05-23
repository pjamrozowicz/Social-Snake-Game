package tai.project;

/**
 * Created by Lukas on 22.05.2017.
 */

import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.*;
import org.springframework.social.facebook.api.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HelloController {

    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    public HelloController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }

    @GetMapping
    public String helloFacebook(Model model) {
        if (connectionRepository.findPrimaryConnection(Facebook.class) == null) {
            return "redirect:/connect/facebook";
        }

        User user = facebook.userOperations().getUserProfile();
        model.addAttribute("facebookProfile", user);
        System.out.println("Id: " + user.getId()
                + " first name: " + user.getFirstName()
                + " last name " + user.getLastName()
                + " gender " + user.getGender());
        return "hello";
    }

    @GetMapping(value = {"/index"})
    public String gameView() {
        return "index";
    }

    @GetMapping(value = {"/hellomo"})
    public String getHello(Model model) {
        User user = facebook.userOperations().getUserProfile();
        System.out.println(user.getFirstName());
        return "hello";
    }

}