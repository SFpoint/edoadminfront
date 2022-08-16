import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const userAccess = (to, from, next) => {
  next();
};

class Page {
  constructor(
    path = null,
    component = null,
    name = null,
    props = false,
    beforeEnter = userAccess
  ) {
    this.path = path;
    this.name = name;
    this.props = props;
    this.component = () => import(`@/pages/${component}`);
    this.beforeEnter = beforeEnter;
  }
}

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/Documents" },
    new Page("/login", "Login", "login"),
    // new Page('/registration/:username/:code', 'Registration', 'registrationConfirm'),
    // new Page('/registration', 'Registration', 'registration'),
    // new Page('/forget', 'ForgetPassword', 'forget'),
    // new Page('/forget/:username/:code', 'ForgetPassword', 'forgetConfirm'),
    new Page("/processes", "Processes", "processes"),
    new Page("/logs", "Logs", "logs"),
    new Page("/Documents", "Documents", "documents"),
    new Page("/Edit", "Edit", "documentEdit", true),
    // {
    //   ...new Page('/profile/:contactPersonId', 'Profile/index', 'profile'),
    //   redirect: { name: 'personal' },
    //   children: [
    //     new Page('personal', 'Profile/Personal', 'personal'),
    //     new Page('changeData', 'Profile/ChangeData', 'changeData'),
    //     new Page('address', 'Profile/Address', 'address'),
    //   ],
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
