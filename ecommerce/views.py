from django.shortcuts import render
from django.http import HttpResponse
from operator import itemgetter, attrgetter
# Create your views here.
import random
import math
products = [
  {
    "name": "Nimble Disc Clear iPhone Case",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2020/08/04153009/nimble-Recycled-iPhone-Case-iphone-11-1.jpg",
    "des": "Did you know that 50 million tonnes of e-waste are projected to end up in our landfills each year? In America alone, E-waste represents 70% of all toxic waste found in landfills. Nimble has set out to change the status quo by creating a sustainable pathway for all tech companies to follow by creating high quality tech products using low impact materials. From their plastic free packaging and use of recycled materials, to their e-waste recycling program and ethical labor standards, Nimble puts people and planet first in all aspects of their business. Nimble believes that all customers should know how their products are made, where they come from, and the impact they have on the world. Stop e-waste with Nimble! ",
  },
  {
    "name": "PowerKnit USB-C to Lightning Charging Cable",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2021/05/27122913/09-nimble-usbc-lightning-charging-cable-1-1.jpg",
    "des": "Did you know that 50 million tonnes of e-waste are projected to end up in our landfills each year? In America alone, E-waste represents 70% of all toxic waste found in landfills. Nimble has set out to change the status quo by creating a sustainable pathway for all tech companies to follow by creating high quality tech products using low impact materials. From their plastic free packaging and use of recycled materials, to their e-waste recycling program and ethical labor standards, Nimble puts people and planet first in all aspects of their business. Nimble believes that all customers should know how their products are made, where they come from, and the impact they have on the world. Stop e-waste with Nimble! ",
  },
  {
    "name": "Cotopaxi Del Día Trece Laptop Sleeve 13in",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2020/07/23093042/Cotopaxi-Repurposed-Nylon-Trece-13-laptop-sleeve-surprise.jpg",
    "des": "By supporting Cotopaxi, you’re supporting a company whose purpose is to promote equality, sustainability, and improve the human condition by donating to those in need. Founder Davis Smith’s love for the outdoors and drive to support the underprivileged areas of the world lead to the creation of Cotopaxi. Through their sale of ethically and sustainably made backpacks, duffel bags, and other outdoor gear, Cotopaxi contributes 1% of their yearly revenue towards providing grants to nonprofit organizations that promote equality in developing areas of the world. To date, they have provided 42 grants to 6 different countries! To confirm their commitment to social and environmental welfare, Cotopaxi is also a B Corp certified company, ranking in the top 10% of registered B Corporations!",
  },
  {
    "name": "WALLY Mini Wall Charger",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2021/05/27122823/05-nimble-wally-mini-1-1.jpg",
    "des": "Simply plug and play with the WALLY Mini Wall Charger from Nimble! Featuring dual USB-C and USB-A ports, the WALLY Mini powers your battery with up to 20w of fast charging. With housing made from RePlay™ Certified Recycled Plastic, this'll be the last wall adapter you'll need for your smartphone and tablets! Plus, like all Nimble Products, this charging pad is Climate Neutral Certified and supports environmental non-profits through 1% for the Planet!",
  },
  {
    "name": "No Bounds Sport Waterproof Bluetooth Speaker",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2019/04/04102736/house-of-marley-no-bounds-sport-waterproof-bluetooth-speaker-black-1.png",
    "des": "No adventure is complete without the perfect soundtrack. But typical speakers can get easily damaged from the elements – and leave you without tunes to jam to. Bring your music wherever you travel with House of Marley's No Bounds Sport Waterproof Bluetooth Speaker! Made from sustainable post-consumer recycled materials like cork, aluminum, and silicone, this travel-friendly speaker is dust-proof, waterproof, and can even float! It charges quickly in less than two hours, and will play up to 12 Read Morecontinuous hours of music so you can go all day. Whether you're connecting via Bluetooth or AUX cord, this mini speaker is easy to stash in a bag, or clip with the carabiner to your backpack. The unique cylindrical design gives you 360 degrees of sound, perfect for amplifying your tunes in all directions. Plus, House of Marley plants a tree for every item purchased, and has planted over 25,000 trees to date – so you can feel great about jammin' to this speaker!",
  },
  {
    "name": "LEGO® Storage Organizer Tote &#038; Play Mat",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2019/03/25115716/LEGO%C2%AE-Storage-organizer-Tote-and-Play-Mat-1.jpg",
    "des": "Tired of stepping on toys while walking across the play area? Us too. That's why we love the Storage Organizer Tote & Play Mat from LEGO® Bag–the perfect set-up for keeping toys organized both at home and on the go. Made from rPET recycled polyester fabric from post-consumer water bottles, which requires 50% less energy and 20% less water to create than conventional polyester, this set contains 3 zip-top containers with easy grab handles and large zipper pullers that fit neatly into an easy-cRead Morearry tote bag. Plus, the tote bag can be unzipped into a play mat to help keep all your little one's toys in one spot.",
  },
  {
    "name": "Carrot Baby Stroller Toy",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2020/10/01111717/Apple-Park-Carrot-Stroller-Toy-1.jpg",
    "des": "Promote healthy eating at a young age with the Carrot Baby Stroller Toy from Apple Park! Made from 100% GOTS certified organic cotton fabric and filled with 100% naturally hypoallergenic corn fiber, this adorable stroller toy is colored with GOTS certified low-impact fabric dye. It features a fun non-toxic rattle and wiggling unit that connects to your stroller easily. Make stroller time more enjoyable with this sweet little veggie!",
  },
  {
    "name": "Zoe the Star Plush Toy",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2019/03/06084750/Under-The-Nile-Zoe-the-Star-Organic-Plush-Toy-1.jpg",
    "des": "Say hello to the perfect cuddle buddy. Zoe the Star by Under the Nile is made from super soft from 100% organic Egyptian cotton, and is stuffed with organic cotton too–making it truly sustainable from the inside out! Perfect for playtime, cuddling, or entertainment on the go, your little one will love this adorable plush toy. Plus, like all Under the Nile products, it contains no BPA, flame retardants, fragrances, or other chemicals–so you can sleep happy knowing your little one is safe and Read Moresnuggly with Zoe the Star!",
  },
  {
    "name": "Painted Wooden Easter Eggs Craft Kit",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2019/04/02084706/EcoPiggy-Painted-Wooden-Eggs-Easter-Craft-Kit-1-.jpg",
    "des": "Celebrate spring sustainably with Ecopiggy's Painted Wooden Easter Eggs Craft Kit! This creative set includes six FSC-certified wooden eggs and six colorful non-toxic powder paints for countless artistic combinations. Handcrafted in the USA, these wooden eggs are a stellar eco-alternative to traditional plastic Easter eggs or chemical-laden egg dye kits. Fun tip: when you're done painting the eggs, varnish them with natural walnut oil or beeswax sealer to make them waterproof and shiny!",
  },
  {
    "name": "Multi-Use Kids Play Center",
    "img": "https://d13wriz42ny3t5.cloudfront.net/production/2020/10/16120615/Plan-Toys-Multiuse-Kids-Play-Center-1.jpg",
    "des": "Puppet show? Lemonade stand? Pop-up kitchen? Wherever your little one's imagination takes them, this Multi-Use Kids Play Center from PlanToys will support it! It comes equipped with everything your kiddo might need; fabric curtains, chalkboards, storage space, and even a pretend stovetop. Plus, all PlanToys are made from sustainably harvested rubberwood trees that can no longer produce latex and paired with surplus sawdust chips. Each toy is finished with E-Zero non-formaldehyde glue and non-toxRead Moreic, water-based dyes. From donating resources to a Children's Museum in local Thailand to using a portion of profits to reforest nearby cities, PlanToys is sustaining the environment and the economy with their innovative rubberwood toys! Suitable for ages 3 and up.",
  }
]
i = 0
for product in products:
    product['id'] = i
    product['price'] = math.floor(random.random() * 6) + 5
    if i < len(products) / 2:
        product['category'] = "audio_tech"
    else:
        product['category'] = "toys"
    i = i + 1
def index(request):
    return render(request, 'home.html')
def goShop(request):
    order = request.GET.get('order','')
    newProducts = []
    if order == 'increase':
        sortProducts = sorted(products, key= lambda i: i['price'])
    elif order == 'decrease':
        sortProducts = sorted(products, key= lambda i: i['price'], reverse=True)
    else:
        sortProducts = products.copy()
    category = request.GET.get('category', '')
    if category == 'audio_tech' or category == 'toys':
        for product in sortProducts:
            if product['category'] == category:
                newProducts.append(product)
    else: 
       newProducts = sortProducts
    context = {
        "products": newProducts
    }
    return render(request, 'shop.html', context = context)
def detail(request, id):
    return render(request, 'detail.html', context = products[id])
def goCart(request):
    return render(request, 'cart.html')
def goProfile(request):
    return render(request, 'profile.html')