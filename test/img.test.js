const fs = require('fs');
const path = require('path');
global.$ = require("jquery");
const { imgExtract, image_set, updateImgPool, getImgStr } = require('../src/plugins/Image/image');

function imageToBase64(imagePath) {
    const image = fs.readFileSync(imagePath);
    return 'data:image;base64,' + Buffer.from(image).toString('base64');
}

describe('imgExtract', () => {
    beforeEach(() => {
    });

    it('should extract image array from content and update image_set', () => {
        const imagePath1 = path.join(__dirname, './images/image1.png');
        const imagePath2 = path.join(__dirname, './images/image2.png');
        const image1 = imageToBase64(imagePath1);
        const image2 = imageToBase64(imagePath2);

        const content = '<!-- the following content is the JSON form of the BASE64-encoded image array which could be used in this file. ["'+image1+'","'+image2+'"] -->';
        imgExtract(content);
        const result = getImgStr();
        expect(result).toBe(content);
    });

    it('should return the original content if JSON parsing fails', () => {
        const content = '<!-- the following content is the JSON form of the BASE64-encoded image array which could be used in this file. invalid-json -->';
        const result = imgExtract(content);
        expect(result).toBe(content);
        expect(image_set).toEqual([]);
    });

    it('should remove the JSON comment from content', () => {
        const content = '<p>Some content</p><!-- the following content is the JSON form of the BASE64-encoded image array which could be used in this file. ["data:image1"] -->';
        const result = imgExtract(content);
        expect(result).toBe('<p>Some content</p>');
        expect(image_set).toEqual([]);
    });

    it('should return the original content if no JSON comment is present', () => {
        const content = '<p>Some content</p>';
        const result = imgExtract(content);
        expect(result).toBe(content);
        expect(image_set).toEqual([]);
    });
});
