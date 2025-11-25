import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const portfolioItems = [
  {
    id: 1,
    title: "Современная квартира-студия",
    category: "interiors",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
    description: "Минималистичный интерьер с акцентом на естественное освещение"
  },
  {
    id: 2,
    title: "Загородный коттедж",
    category: "exteriors",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    description: "Архитектурная визуализация премиум-класса"
  },
  {
    id: 3,
    title: "Пентхаус с панорамными окнами",
    category: "interiors",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    description: "Роскошная визуализация с видом на город"
  },
  {
    id: 4,
    title: "Современный офисный комплекс",
    category: "exteriors",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    description: "Коммерческая недвижимость для девелоперов"
  },
  {
    id: 5,
    title: "Spa-зона премиум отеля",
    category: "interiors",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    description: "Атмосферная визуализация с вниманием к деталям"
  },
  {
    id: 6,
    title: "Видео-тур по резиденции",
    category: "animations",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    description: "3D-анимация для презентации проекта"
  }
];

const heroSlides = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
];

const heroHeadlines = [
  "Превращаю замыслы в фотореалистичные эмоции",
  "Дайте жизнь проекту до закладки первого камня",
  "Архитектура, которую хочется потрогать"
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert(`Спасибо, ${formData.name}! Я свяжусь с вами по адресу ${formData.email}`);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide} 
              alt={`Архитектурная визуализация ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-center animate-fade-in-up tracking-tight">
            Превращаю замыслы<br />в фотореалистичные эмоции
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-center font-light opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Визуализация, которая продаёт вашу архитектуру
          </p>
          <Button 
            size="lg" 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg animate-fade-in-up button-hover-effect"
            style={{animationDelay: '0.4s'}}
          >
            Смотреть работы
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">Портфолио</h2>
          <p className="text-muted-foreground text-lg">Избранные проекты</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'interiors', 'exteriors', 'animations'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'Все проекты' : 
               category === 'interiors' ? 'Интерьеры' :
               category === 'exteriors' ? 'Экстерьеры' : 'Анимации'}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 animate-scale-in"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => setLightboxImage(item.id)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-white/90">{item.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">Обо мне</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Специализируюсь на архитектурной 3D-визуализации для частных интерьеров, 
                коммерческой недвижимости и девелоперов.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Моя философия — превратить архитектурные чертежи в живые, эмоциональные образы, 
                которые помогают клиентам увидеть их мечту еще до начала строительства.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Каждый проект — это внимание к деталям, мастерство работы со светом и композицией, 
                глубокое понимание архитектурных форм и материалов.
              </p>
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Готов визуализировать ваш проект?
              </Button>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop" 
                alt="Архитектор-визуализатор — профессиональная 3D визуализация"
                className="w-full aspect-square object-cover shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground animate-fade-in">
            Свяжитесь со мной
          </h2>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in">
            Готов обсудить ваш проект и воплотить вашу идею в жизнь
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <Input 
              placeholder="Ваше имя" 
              className="h-12 text-base"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input 
              type="email" 
              placeholder="Email" 
              className="h-12 text-base"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Textarea 
              placeholder="Расскажите о вашем проекте"
              className="min-h-[150px] text-base"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto px-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </form>

          <div className="flex justify-center gap-6 mt-12">
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" 
               className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Globe" size={28} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Linkedin" size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Instagram" size={28} />
            </a>
          </div>
        </div>
      </section>

      {lightboxImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <div className="max-w-6xl w-full">
            <img 
              src={portfolioItems.find(item => item.id === lightboxImage)?.image}
              alt={portfolioItems.find(item => item.id === lightboxImage)?.title || "Архитектурная визуализация"}
              className="w-full h-auto max-h-[85vh] object-contain animate-scale-in"
            />
            <div className="text-white text-center mt-6">
              <h3 className="text-2xl font-medium mb-2">
                {portfolioItems.find(item => item.id === lightboxImage)?.title}
              </h3>
              <p className="text-white/80">
                {portfolioItems.find(item => item.id === lightboxImage)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}