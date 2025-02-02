const sleep = (secs = 1) => new Promise((resolve) => {
    setTimeout(resolve, secs * 1000);
});

export default sleep;
