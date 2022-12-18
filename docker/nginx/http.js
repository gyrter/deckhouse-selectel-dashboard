function decoded_target_url(r) {
    return decodeURIComponent(r.args.rd);
}

export default {decoded_target_url};
