#! /bin/bash
if [ "$EUID" -eq 0 ]; then
    echo "Please run this script as a regular user, not as root."
    exit 1
fi
# update system
sudo pacman -Syu --noconfirm

# install yay
if ! command -v yay &> /dev/null; then
    echo "yay is not installed, installing yay"
    git clone https://aur.archlinux.org/yay.git $HOME/.local/yay
    cd $HOME/.local/yay
    makepkg -si
    echo "yay installed"
fi

nvidia_present=false
if lspci | grep -i nvidia &> /dev/null; then
    nvidia_present=true
fi

# Install NVIDIA drivers if an NVIDIA GPU is detected
if [ "$nvidia_present" = true ]; then
    echo "NVIDIA GPU detected. Installing NVIDIA drivers."
    yay -S --noconfirm nvidia nvidia-dkms nvidia-settings nvidia-prime acpi_call optimus-manager optimus-manager-qt cuda
    echo "blacklist nouveau" | sudo tee /etc/modprobe.d/blacklist-nvidia-nouveau.conf
    sudo mkinitcpio -P
    sudo systemctl enable optimus-manager.service
    sudo systemctl start optimus-manager.service
    echo "NVIDIA drivers installation complete."
    # Install CUDA if an NVIDIA GPU is detected
    echo "Installing CUDA..."
    yay -S --noconfirm 
    echo "CUDA installation complete."

else
    echo "No NVIDIA GPU detected. No action taken."
fi
# install de/wm
echo "Choose an environment or window manager:"
echo "1. GNOME"
echo "2. AwesomeWM"
echo "3. Hyprland"
read -p "Enter the number corresponding to your choice (or press Enter to skip): " choice

environment_name=""

case $choice in
    1)
        environment_name="GNOME"
        ;;
    2)
        environment_name="AwesomeWM"
        ;;
    3)
        environment_name="Hyperland"
        ;;
    *)
        echo "No environment or window manager selected. Continuing without installing."
        ;;
esac

if [ -n "$environment_name" ]; then
    echo "Installing $environment_name..."

    yay -S --noconfirm xorg-server xorg-xinit

    case $environment_name in
        "GNOME")
            yay -S --noconfirm - < gnome-packages.txt
            ;;
        "AwesomeWM")
            yay -S --noconfirm - < awesomewm-packages.txt
            ;;
        "Hyperland")
            if [ "$nvidia_present" = true ]; then
                yay -S --noconfirm - < hyperland-nvidia-packages.txt
            else
                yay -S --noconfirm - < hyperland-packages.txt
            fi
            ;;
        *)
            echo "No additional packages for $environment_name."
            ;;
    esac

    echo "$environment_name installation complete."
else
    echo "Skipping environment or window manager installation."
fi


cp .config/alacritty ~/.config -r 
cp .config/neofetch ~/.config -r
cp .config/sheldon ~/.config -r
