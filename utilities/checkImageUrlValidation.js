/**
 *
 * @param {string} url
 */

module.exports = (url) => {
  if (url.trim().length < 1)
    return "You must not enter empty value for image url";
  const regexp = /(https?:\/\/)?(www.)?(\w+\.)*\w+\.\w+\/.+/;

  if (url.match(regexp)) return true;
  return false;
};

// example 1 => https://www.api.com/image/1.png
// example 2 => http://www.api.com/image/1.png
// example 3 => www.api.com/image/1.png
// example 4 => api.com/image/1.png
// example 5 => subdomain.api.com/image/1.png
