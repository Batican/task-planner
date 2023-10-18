import toastr from "toastr";

export default ({ app }, inject) => {
  inject("toastr", toastr);
};
