let selectedSize = null;
        
        function selectSize(element) {
            // Если кликаем на уже выбранный размер - снимаем выделение
            if (element === selectedSize) {
                element.classList.remove('selected');
                selectedSize = null;
                return;
            }
            
            // Снимаем выделение с предыдущего выбранного элемента
            if (selectedSize) {
                selectedSize.classList.remove('selected');
            }
            
            // Добавляем выделение новому элементу
            element.classList.add('selected');
            selectedSize = element;
        }