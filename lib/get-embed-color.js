// Set the embed color based on compensation. Applied to job posts for better at-a-glance readability.
function getEmbedColor(name) {
  let colors = {
    'Paid': '#69db7c',
    'Royalty': '#ffe066',
    'Unpaid': '#ffa94d'
  }

  console.log(`Compensation: ${name}`, `Color: ${colors[name]}`)

  if (colors[name]) {
    return colors[name]
  } else {
    console.error('Invalid compensation. No matching color found.')
  }
}

module.exports = getEmbedColor
