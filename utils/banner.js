const figlet = require("figlet");

function createBanner() {
    return new Promise((resolve, reject) => {
        figlet(
            "Employee Manager",
            {
                font: "Big",
                horizontalLayout: "default",
                verticalLayout: "default"
            },
            function(err, data) {
                if (err) {
                    console.log("Something went wrong...");
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
}

const banner = {

    displayBanner: async function() {
        const data = await createBanner();
        console.log("\n");
        console.log(data);
        console.log("\n");
    }
};
module.exports = banner;