export default ({ app }, inject) => {
  inject(
    "confirm",
    async function (
      title = "Are you sure?",
      message = "This action cannot be undone."
    ) {
      return await this.$swal
        .fire({
          title,
          html: message,
          icon: "warning",
          reverseButtons: true,
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonText: "Confirm",
          allowOutsideClick: () => !Swal.isLoading(),
        })
        .then((result) => {
          return result.isConfirmed;
        });
    }
  );
};
