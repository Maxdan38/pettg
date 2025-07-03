from telegram import Update, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start - создает главное меню"""
    # Создаем кнопки для главного меню
    keyboard = [
        [KeyboardButton("Каталог")],
        [KeyboardButton("О боте")],
    ]
    
    # Создаем разметку клавиатуры
    reply_markup = ReplyKeyboardMarkup(
        keyboard, 
        resize_keyboard=True,  # Автоматическое изменение размера
        one_time_keyboard=False  # Клавиатура остается после нажатия
    )
    
    # Отправляем сообщение с клавиатурой
    await update.message.reply_text(
        "Привет! Я бот vadick. Выберите команду:",
        reply_markup=reply_markup,
    )

async def about_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик кнопки 'О боте'"""
    await update.message.reply_text("Этот бот создан для заказа кроссовок.")

async def catalog_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик кнопки 'Каталог' - показывает кнопку для мини-приложения"""
    # Создаем кнопку для открытия мини-приложения
    mini_app_button = KeyboardButton(
        text="🛒 Открыть магазин",  # Эмодзи для лучшей видимости
        web_app=WebAppInfo(url="https://maxdan38.io/pettg/")
    )
    
    # Создаем клавиатуру с кнопкой
    keyboard = [[mini_app_button]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    
    # Отправляем сообщение с кнопкой
    await update.message.reply_text(
        "📚 Нажмите кнопку ниже, чтобы открыть каталог:",
        reply_markup=reply_markup
    )

def main() -> None:
    # Инициализируем приложение с токеном
    # ЗАМЕНИТЕ "YOUR_BOT_TOKEN" на реальный токен!
    application = Application.builder().token("7689838916:AAHC33XLI848zPrig2b9PgCvtf9zC5EjIhw").build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))
    
    # Обратите внимание: фильтр должен точно совпадать с текстом кнопки
    application.add_handler(MessageHandler(filters.Text("О боте"), about_command))
    application.add_handler(MessageHandler(filters.Text("Каталог"), catalog_command))
    application.add_handler(MessageHandler(filters.Text("🛒 Открыть магазин"), catalog_command))
    
    # Запускаем бота
    application.run_polling()
    print("Бот запущен...")

if __name__ == "__main__":
    main()