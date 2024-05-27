const path = require("path");
const fs = require("fs");
const posts = require("../database/db.js");

const index = (req, res) => {
    res.format({
        html: () => {
            let html = '<ul>';

            posts.forEach(({ title, image, content, tags }) => {
                html += `<li>
                    <div>
                        <h2>${title}</h2>
                        <p>${content}</p>
                        <p>${tags.map(tag => `<span>${tag}</span>`).join(' ')}</p>
                        <img width="150" src=${`/imgs/posts/${image}`} />
                    </div>
                </li>`
            })

            html += '</ul>';
            res.send(html);
        },
        json: () => {
            res.json({
                data: posts,
                count: posts.length
            });
        }
    });
};

module.exports = {
    index
}